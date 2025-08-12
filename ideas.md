---

### 6. Mood Tracker App

**Core Features (G-level):**

* Track and save daily mood entries (emojis/colors + notes).
* Fetch motivational quotes or mood tips from an online JSON file (web request).
* Calendar view showing mood history (`react-native-calendars`).
* Use camera to add photos/selfies with mood entries (`expo-camera` or `expo-image-picker`).
* Store all data locally with AsyncStorage.
* Flexbox-based responsive UI with core components like FlatList, Text, Image, Button, Modal.

**VG-level Upgrades:**

* Custom splash screen.
* React Navigation tabs (Mood Entry, History, Settings).
* Notifications to remind users to log mood daily (`expo-notifications`).
* Use `expo-sensors` for optional mood indicators (like phone shake to toggle mood).
* Swipe gestures to delete mood entries (`react-native-gesture-handler`).
* Platform-specific UI components (DatePicker, ActionSheetIOS).
* ESLint + Prettier for code quality.

---

### 9. Plant Care Reminder

**Core Features (G-level):**

* Add plants with name, species, photo (`expo-camera` or `expo-image-picker`), and care notes.
* Fetch plant care tips or schedules from JSON online.
* Calendar view to schedule watering/fertilizing reminders.
* Use location permission (`expo-location`) to give simple climate-based care tips.
* Store data locally with AsyncStorage.
* Flexbox layout using core components like FlatList, Text, Image, Button, Modal.

**VG-level Upgrades:**

* Custom splash screen.
* React Navigation tabs (My Plants, Care Schedule, Settings).
* Notifications for watering/fertilizing reminders (`expo-notifications`).
* Swipe gestures to mark plants as watered or delete (`react-native-gesture-handler`).
* Platform-specific components (DatePicker, ActionSheetIOS).
* ESLint + Prettier setup.


---

## **Friend Keeper – A Social Memory App**

**Concept:**
A personal database for your friends. You can store their birthday, address (map), wishlist, upcoming plans, and even set reminders.
Perfect for remembering to send a card, buy a gift, or check in.

---

### **Core Features (G-level)**

1. **Friend List & Details**

   * Store: name, birthday, address, wishlist items, personal notes.
   * **Core Components:** FlatList (list of friends), Text, TextInput, Image, TouchableOpacity, ScrollView, Modal.
   * Local storage using `@react-native-async-storage/async-storage`.

2. **Birthdays**

   * Calendar integration (`react-native-calendars`) to view upcoming birthdays.
   * Web request to fetch fun birthday quotes or greeting ideas from a hosted JSON file.

3. **Addresses**

   * Show address on a map (`react-native-maps` + `expo-location`).
   * Ask for location permissions if needed.

4. **Wishlist**

   * Add photos of gift ideas using `expo-image-picker` or `expo-camera`.

5. **Plans & Reminders**

   * Simple reminder list linked to each friend.

6. **Flexbox Layout**

   * Card-style friend profiles with responsive design.

---

### **VG-level Upgrades**

1. **Custom Splash Screen**

   * Designed with your own logo/branding.

2. **Navigation**

   * **React Navigation** with tabs:
     *Friends* | *Calendar* | *Wishlist* | *Settings*

3. **Extra Libraries**

   * `expo-notifications` → birthday reminders and plan notifications.
   * `react-native-gesture-handler` → swipe to delete friends or wishlist items.
   * Optional: `react-native-share` to share a wishlist or address with others.

4. **More Components**

   * Platform-specific DatePicker (Android) or ActionSheetIOS.
   * ActivityIndicator for loading data.
   * SectionList for grouping friends (e.g., by month of birthday).

5. **Code Quality**

   * ESLint + Prettier set up and enforced.

---

### **Why This Fits the Requirements**

* ✅ **Web request** → greeting ideas JSON or quotes API.
* ✅ **At least 5–10 Core Components** for G; 10+ for VG.
* ✅ **At least 1 third-party library** for G, 3 for VG.
* ✅ **Flexbox** for layout.
* ✅ **Sufficient scope** for a 2-week build.
* ✅ **Expo-compatible libraries** for media, maps, permissions, notifications, etc.
* ✅ **Android/iOS-specific** components possible.

---


---

## **Friend Keeper – React Native Project Requirements Mapping**

### **G Requirements**

| Requirement                                                       | How Friend Keeper Meets It                                                                                                                                                                                      |
| ----------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Web request via `useEffect`** (fetch from external JSON or API) | On startup, `useEffect` fetches *fun birthday greeting ideas* or *gift inspiration* from an **online JSON file** hosted on GitHub or a free API. Displayed in the “Ideas” section of each friend’s profile.     |
| **At least 1 third-party React Native library**                   | Uses **`react-native-calendars`** to display upcoming birthdays in a monthly calendar view.                                                                                                                     |
| **5–10 Core Components & APIs**                                   | FlatList (friends list), ScrollView (friend details), Image (profile picture), Text, TextInput, Button, TouchableOpacity, Modal (edit details), Switch (toggle reminders), ActivityIndicator (loading state).   |
| **Flexbox for layout**                                            | Friend cards arranged in a responsive grid/list using Flexbox. Profile details screen uses Flexbox for section alignment.                                                                                       |
| **Scope for 2-week project**                                      | Adding, editing, deleting friends; storing personal info; calendar for birthdays; maps for addresses; photo upload; fetching ideas from API; local data storage with AsyncStorage. All achievable in \~2 weeks. |

---

### **VG Requirements**

| Requirement                                                    | How Friend Keeper Meets It                                                                                                                                                                                                                             |
| -------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Custom splash screen**                                       | Splash screen with app logo and tagline (e.g., “Never forget the important days”). Created using Expo’s splash screen configuration.                                                                                                                   |
| **At least 3 third-party React Native libraries**              | 1) `react-native-calendars` (birthdays), 2) `react-native-maps` (show friend addresses), 3) `expo-notifications` (birthday and plan reminders).                                                                                                        |
| **10+ Core Components & APIs, including Android/iOS-specific** | All G-level components **plus**: SectionList (group friends by birthday month), Platform-specific DatePicker (Android) or ActionSheetIOS (iOS), ImageBackground (profile header), Animated API (birthday countdown), Alert API (confirmation dialogs). |
| **Routing with React Navigation**                              | Tab navigation for: *Friends* (list), *Calendar*, *Ideas*, *Settings*. Stack navigation for friend detail/edit screens.                                                                                                                                |
| **ESLint configuration**                                       | ESLint installed and configured to follow a consistent style guide (e.g., Airbnb or Standard).                                                                                                                                                         |
| **All files formatted with Prettier**                          | Prettier installed; pre-commit hook with Husky to auto-format on save/commit.                                                                                                                                                                          |
| **Larger scope than G**                                        | Adds notifications, multiple navigation flows, extra libraries, animated components, grouped lists, platform-specific UIs, and polished splash screen.                                                                                                 |

---

### **Extra Features (Optional but Nice)**

* **Photo Picker**: Use `expo-image-picker` to add a profile photo for each friend.
* **Maps Integration**: Tap a friend’s address to open map with marker.
* **Reminders**: Notifications a few days before birthdays or scheduled plans.
* **Gift Wishlist**: Per-friend gift ideas with photos and notes.
* **Search Bar**: Quickly filter the friend list.

---

