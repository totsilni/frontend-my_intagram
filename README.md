# MY_FIRST_INTAGRAM

## Overview
This project is a simplified version of Instagram, developed as part of the Qwasar Silicon Valley Full Stack Developer training program. It allows users to log in, create posts, comment on posts, like posts, and follow other users.

## Features
- **User Authentication**: Users can sign up, log in, and log out securely.
- **Create Posts**: Authenticated users can create new posts, consisting of images and captions.
- **Comment on Posts**: Users can leave comments on posts made by other users.
- **Like Posts**: Users can like posts made by other users.
- **Follow Users**: Users can follow other users to stay updated with their posts.

## Technologies Used
- **Backend**: `Ruby on Rails`
- **Frontend**: `HTML`, `CSS`, `JavaScript`
- **Database**: `PostgreSQL`
- **Authentication**: `Devise gem`
- **Image Storage**: `AWS S3` (for storing images)

## Setup Instructions
1. Clone the repository to your local machine.
   ```bash
   git clone https://github.com/your_username/my_instagram.git
   ```
2. Navigate to the project directory.
   ```bash
   cd my_instagram
   ```
3. Install dependencies.
   ```bash
   bundle install
   ```
4. Set up the database.
   ```bash
   rails db:create
   rails db:migrate
   ```
5. Configure environment variables.
   - Create a `.env` file in the project root.
   - Add the following variables:
     ```
     AWS_ACCESS_KEY_ID=your_aws_access_key_id
     AWS_SECRET_ACCESS_KEY=your_aws_secret_access_key
     AWS_BUCKET=your_aws_bucket_name
     ```
   - Replace `your_aws_access_key_id`, `your_aws_secret_access_key`, and `your_aws_bucket_name` with your AWS credentials and bucket name.
6. Start the Rails server.
   ```bash
   rails server
   ```
7. Access the application in your browser at `http://localhost:3000`.

## Usage
1. Sign up for an account if you're a new user.
2. Log in with your credentials.
3. Explore the features:
   - Create posts by uploading images and adding captions.
   - Like and comment on posts made by other users.
   - Follow other users to see their posts in your feed.
   
## Contributing
Contributions are welcome! If you have suggestions for improving this project, please open an issue or submit a pull request.

## Core Team 
Furqatjon Zokirjonovich
