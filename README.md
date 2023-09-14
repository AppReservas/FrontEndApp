# App Reservas

Este proyecto tiene la finalidad de poder hacer reservas de escenarios deportivos privados como lo son las canchas sinteticas y canchas de volley playa.

## Configuración del Entorno de Desarrollo

### Plataforma iOS

1. **Instalar Xcode:**
   Asegúrate de tener [Xcode](https://developer.apple.com/xcode/) instalado en tu sistema. Puedes descargarlo desde la Mac App Store.

2. **Configurar el Simulador de iOS:**
   Abre Xcode, ve a "Preferences" > "Components" y asegúrate de tener al menos un simulador de iOS instalado.

### Plataforma Android

1. **Instalar Android Studio:**
   Descarga e instala [Android Studio](https://developer.android.com/studio/index.html). Asegúrate de incluir el Android SDK y las herramientas necesarias durante la instalación.

2. **Configurar Variables de Entorno:**
   Agrega las siguientes rutas al archivo `~/.bash_profile` o `~/.bashrc` (en macOS) o al archivo `~/.bashrc` o `~/.bash_profile` (en Linux):

   ```bash
   export ANDROID_HOME=$HOME/Android/Sdk
   export PATH=$PATH:$ANDROID_HOME/emulator
   export PATH=$PATH:$ANDROID_HOME/tools
   export PATH=$PATH:$ANDROID_HOME/tools/bin
   export PATH=$PATH:$ANDROID_HOME/platform-tools

Reinicia la terminal o ejecuta source ~/.bash_profile (o source ~/.bashrc en Linux) para aplicar los cambios.

3. **Crear un Dispositivo Virtual (AVD):**
   Abre Android Studio, ve a "Configure" > "AVD Manager" y crea un nuevo dispositivo virtual.

### Ejecutar Aplicacion
Para ejecutar la aplicación en tu entorno local, utiliza los siguientes comandos:

 ```bash
 # Instalar dependencias
npm install

# Iniciar la aplicación
npx react-native run-android   # Para Android
npx react-native run-ios       # Para iOS
