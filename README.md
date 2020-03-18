ionic cordova platform remove android
ionic cordova platform add android@x.x.x

ionic cordova plugin remove (ALL)

//REINSTALL PLUGINS

ionic cordova plugin remove cordova-plugin-device cordova-plugin-background-mode cordova-plugin-console
ionic cordova plugin remove cordova-plugin-inappbrowser cordova-plugin-network-information cordova-plugin-splashscreen cordova-plugin-whitelist ionic-plugin-keyboard cordova-plugin-ionic-webview

ionic cordova plugin add cordova-plugin-device cordova-plugin-background-mode cordova-plugin-console
ionic cordova plugin add cordova-plugin-inappbrowser cordova-plugin-network-information cordova-plugin-splashscreen cordova-plugin-whitelist ionic-plugin-keyboard cordova-plugin-ionic-webview

ionic cordova build



###
ionic cordova plugin add cordova-plugin-console cordova-plugin-device cordova-plugin-background-mode
ionic cordova plugin add cordova-plugin-inappbrowser cordova-plugin-network-information cordova-plugin-splashscreen cordova-plugin-whitelist ionic-plugin-keyboard

/Volumes/Mac HD/dev/ionic/app-cidadefm-ionic/platforms/android/build/outputs/apk/release/android-release-unsigned.apk

app/build/outputs/apk/release

jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore my-release-key.keystore app-release-unsigned.apk alias_name

./zipalign -v 4 /Volumes/Mac\ HD/dev/ionic/app-cidadefm-ionic/platforms/android/app/build/outputs/apk/release/android-release-unsigned.apk /Volumes/Mac\ HD/dev/ionic/app-cidadefm-ionic/platforms/android/app/build/outputs/apk/release/cidadefm897mc.apk

keytool -importkeystore -srckeystore my-release-key.keystore -destkeystore my-release-key.keystore -deststoretype pkcs12

keytool -importkeystore -srckeystore testapk.keystore -destkeystore testapk.keystore -deststoretype pkcs12

ionic cordova plugin add cordova-plugin-device cordova-plugin-background-mode