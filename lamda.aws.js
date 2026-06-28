// lambda function to update user image
import mongoose from "mongoose";
// We need a minimal User schema to update the profilePic field
const userSchema = new mongoose.Schema({
    profilePic: String
}, { strict: false }); // strict: false allows us to update without fully defining the model

const User = mongoose.models.User || mongoose.model("User", userSchema);

let isConnected = false;

const connectToDatabase = async () => {
    if (isConnected) {
        console.log("Using existing database connection");
        return;
    }
    
    const DB_URL = process.env.DB_URL; // Provide this in Lambda environment variables
    if (!DB_URL) {
        throw new Error("DB_URL environment variable is missing");
    }

    console.log("Creating new database connection");
    await mongoose.connect(DB_URL);
    isConnected = true;
};

exports.handler = async (event) => {
    try {
        await connectToDatabase();

        // Check if this is an S3 Event Notification
        if (event.Records && event.Records[0] && event.Records[0].eventSource === 'aws:s3') {
            for (const record of event.Records) {
                const s3 = record.s3;
                const bucketName = s3.bucket.name;
                // S3 object keys are URL encoded
                const objectKey = decodeURIComponent(s3.object.key.replace(/\+/g, " "));

                console.log(`Processing S3 event for bucket: ${bucketName}, key: ${objectKey}`);

                // Expected key format from backend: users/{userId}/{filename}
                const pathParts = objectKey.split('/');
                
                if (pathParts[0] === 'users' && pathParts.length >= 2) {
                    const userId = pathParts[1];
                    const region = record.awsRegion || process.env.AWS_REGION || 'ap-northeast-2';
                    
                    // Construct the public URL for the uploaded image
                    const profilePicUrl = `https://${bucketName}.s3.${region}.amazonaws.com/${objectKey}`;

                    // Update the user's profilePic in the database
                    const updatedUser = await User.findByIdAndUpdate(
                        userId, 
                        { profilePic: profilePicUrl },
                        { new: true }
                    );

                    if (updatedUser) {
                        console.log(`Successfully updated user ${userId} with new profile picture: ${profilePicUrl}`);
                    } else {
                        console.log(`User ${userId} not found in database.`);
                    }
                } else {
                    console.log(`Object key ${objectKey} does not match expected format users/{userId}/...`);
                }
            }
            
            return {
                statusCode: 200,
                body: JSON.stringify({ message: "S3 Event processed successfully" })
            };
        } 
        
        // Alternatively, if this is an API Gateway HTTP request
        if (event.httpMethod || event.requestContext) {
            const body = JSON.parse(event.body || '{}');
            const { userId, imageUrl } = body;
            
            if (!userId || !imageUrl) {
                return {
                    statusCode: 400,
                    body: JSON.stringify({ message: "userId and imageUrl are required" })
                };
            }
            
            const updatedUser = await User.findByIdAndUpdate(
                userId,
                { profilePic: imageUrl },
                { new: true }
            );
            
            if (!updatedUser) {
                return {
                    statusCode: 404,
                    body: JSON.stringify({ message: "User not found" })
                };
            }
            
            return {
                statusCode: 200,
                body: JSON.stringify({
                    message: "User image updated successfully",
                    user: updatedUser
                })
            };
        }

        return {
            statusCode: 400,
            body: JSON.stringify({ message: "Unsupported event format" })
        };

    } catch (error) {
        console.error("Error in lambda function:", error);
        return {
            statusCode: 500,
            body: JSON.stringify({ message: "Internal server error", error: error.message })
        };
    }
};
