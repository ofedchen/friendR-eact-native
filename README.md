# FriendR

A cross-platform mobile application built with React Native for managing social connections and tracking important moments with friends.

## Project Overview

FriendR is a friend management app that helps you keep track of your social network and never forget birthdays. Manage friend information, create wishlists, and automatically sync birthday reminders to your device calendar.

## Project Features

### Friend Management
- **Add Friends**: Store friend information including name, birthday, address, and profile picture
- **Friend Profiles**: View detailed information about each friend on their dedicated profile page
- **Quick Access**: Horizontally scrollable friend list with profile images for easy browsing

### Birthday Reminders
- **Automatic Calendar Integration**: Sync friends' birthdays to your device calendar
- **Smart Notifications**: Dual reminders - one week before and on the birthday itself
- **Recurring Events**: Birthday events repeat yearly automatically

### Wishlists
- **Gift Ideas**: Add and manage wishlists for each friend
- **Easy Updates**: Quick add/remove items from friends' wishlists
- **Gift Planning**: Know exactly what to get for each friend

### User Experience
- **Cross-Platform**: Works seamlessly on iOS, Android, and Web
- **Intuitive Navigation**: Stack-based navigation flow for smooth user experience
- **Responsive Design**: Optimized UI for different screen sizes
- **Toast Notifications**: Real-time feedback for user actions

## 🛠️ Tech Stack

- **Framework**: React Native 0.79.5 with Expo 53.0.20
- **Navigation**: React Navigation (Native Stack Navigator)
- **UI Components**: React Native Paper
- **Icons**: FontAwesome SVG Icons, Material Design Icons
- **Calendar**: Expo Calendar API integration
- **Image Management**: Expo Image Picker with base64 encoding
- **Date/Time**: React Native Community DateTimePicker
- **Backend**: JSON Server (for development)
- **Code Quality**: ESLint with Expo configuration

## 📁 Project Structure

```
FriendR/
├── App.js                 # Main app component with navigation setup
├── index.js              # Entry point
├── package.json          # Dependencies and scripts
├── db.json              # Local database (JSON Server)
├── components/
│   └── StyledButton.js  # Reusable button component
├── screens/
│   ├── HomeScreen.js    # Main friend list view
│   ├── AddFriendPage.js # Add new friend form
│   └── FriendScreen.js  # Individual friend detail view
└── assets/              # Media assets
```

## 🚀 Getting Started

### Prerequisites
- Node.js and npm installed
- Expo CLI (`npm install -g expo-cli`)
- iOS Simulator or Android Emulator (or physical device)
- Update IP address in `HomeScreen.js` and `AddFriendPage.js` to your local machine's IP

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd FriendR
```

2. Install dependencies:
```bash
npm install
```

3. Start the JSON Server (for backend):
```bash
npx json-server --watch db.json --port 3000
```

4. Update server IP addresses in screen files:
- In `screens/HomeScreen.js` and `AddFriendPage.js`, change the `SERVER_URL` to your machine's IP
- Example: `http://192.168.1.YOUR_IP:3000/friends`

5. Start the app:
```bash
npm start
```

### Running on Different Platforms

- **iOS**: Run `npm run ios` (requires Xcode)
- **Android**: Run `npm run android` (requires Android Studio/Emulator)
- **Web**: Run `npm run web` (opens in browser)

## 📱 Usage

### Adding a Friend
1. Tap "Add your friends" button on the home screen
2. Fill in friend details:
   - Name
   - Birthday (date picker)
   - Address
   - Profile picture (select from gallery)
3. Tap "Save Friend" to add to your list

### Viewing Friend Details
1. Tap on any friend card on the home screen
2. View their complete profile information
3. Manage their wishlist by adding/removing gift ideas

### Setting Birthday Reminders
1. Return to the home screen
2. Tap "Add your friends birthdays to calendar"
3. Birthday events are automatically added to your device calendar
4. You'll receive reminders one week before and on their birthday

## 🏗️ Architecture

### Component-Based Structure
- Modular design with reusable components (`StyledButton`)
- Separation of concerns across screens and components

### State Management
- React Hooks (useState, useEffect) for local state
- Fetch API for HTTP requests to backend

### Data Flow
1. Component loads data from JSON Server via REST API
2. User interactions trigger state updates
3. Updates are persisted to backend via PATCH requests
4. UI re-renders with new data

## 🔐 Permissions

The app requests the following device permissions:
- **Calendar**: For creating and managing birthday events
- **Image Library**: For selecting and storing friend profile pictures
- **Camera** (optional): For taking photos

## 📝 API Integration

The app uses a JSON Server backend with the following endpoints:

- `GET /friends` - Retrieve all friends
- `POST /friends` - Add a new friend
- `PATCH /friends/:id` - Update friend details (birthday reminders, wishlist)
- `DELETE /friends/:id` - Remove a friend

## 🚀 Scalability Features

- **Modular architecture** allows easy addition of new features
- **Reusable components** support consistent UI expansion
- **Clean API separation** enables future backend migration
- **Screen-based organization** facilitates feature isolation
- **Future-ready** for features like: friend groups, activity feeds, messaging, etc.

## 🔮 Future Enhancements

- Search/filter friends functionality
- Activity planning
- Messaging between users
- Social connections and mutual friends
- Friend request system
- More wishlist features (links, prices, notes)

## 👤 Author

Developed as part of IT-Högskolans React Native training program.

## 📄 License

Private project

---

**Happy friend managing! 👫**
