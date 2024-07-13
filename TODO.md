# MUSICOLOGO

Una app solamente para escuchar musica.

## 📱 Frontend

#### Core Components 🎸
- [ ] **NowPlaying Component**
  - Portada
  - Detalles de la cancion
  - play / pause
  - barra de progreso

#### Screens 🎆
- [ ] **Home Screen:**
  - lista de canciones
  - boton a profile
  - Search
- [ ] **NowPlaying screen:**
  - Portada
  - Detalles de la cancion
  - Botones de control
  - Add to playlist
  - Lyrics **(opcional)**
  - Stream **(opcional)**
  - Reproducciones **(opcional)**
- [ ] **Profile Screen:**
  - Nombre (editable) y correo
  - Mis playlists
  - Crear playlist
  - Logout
- [ ] **Playlist Screen:**
  - Portada
  - Nombre (editable)
  - Lista de canciones
  - Boton de play

#### Other Screens 🎇
- [x] **Onboarding Screen:**
  - Bienvenida
  - Continuar
- [ ] **Login Screen:**
  - Email
  - Password
  - Login
  - Forgot Password
  - Sign Up
- [ ] **Sign Up Screen:**
  - Email
  - Password
  - Confirm Password
  - Sign Up
- [ ] **Forgot Password Screen:**
  - Email
  - Send Email

### 🗄️ Backend
- **Authentication**
  - Sign in / Sign up
  - Forgot Password
  - Logout

- **Tracks**
  - **GET** getSongs (paginated, filtered)
  - **GET** getSongDetails
  - *POST* addToPlaylist

- **Playlist**
  - **GET** getPlaylistDetails

  - *POST* updatePlaylistDetails

- **User**
  - **GET** getUserDetails
  - **GET** getMyPlaylists

  - *POST* updateUserDetails
  - *POST* createPlaylist
