[YouTube - Presentation video](https://www.youtube.com/watch?v=sIdqMQTGNSc)

[Hamdash Demo](https://va3hdl.github.io/hamdash/)  -- Test it before download

### Instructions:
1. Just clone the the repository by using the ```git clone https://github.com/hb3xcv/hamdashboard.git```.
2. Open index.html with any browser of your preference and you done.
3. With any text editor (like Notepad) you can change your personal details, the source images (can be more than one per box) or the menu options from the config.js file in the config folder.

[YouTube - Configuration instructions contributed by Jason KM4ACK](https://youtu.be/9ZZXg60tN-o) (OM details are not shown in the video)

### Quick Help:
* Double click on an image to expand to full screen.
* Double click again to close full screen view.
* Right click on an image to display the next one. (In the latest version is possible to add multiple images per box.)
* The content refreshes automatically every 5 minutes.

Is that easy!

73 de HB3XCV

### Fix for Pi-Star iFrame embedding issues:
This error can occur if the server has certain security measures in place, such as the x-frame-options header, which prevents its content from being embedded on other websites using iframes.

1. Login via ssh to the pi-star then run this command to switch to Read/Write mode:

        rpi-rw

2. In the file /etc/nginx/default.d/security.conf comment the line below with a "#" in front, like this:

        # add_header X-Frame-Options  "SAMEORIGIN";

3. Run this command to switch back to Read Only mode:

        rpi-ro

4. Then reboot the pi-star

### More on iFrame embedding:
There is very little that can be done on the client side if the source site does not allow embedding the site inside another page (like the dashboard!) specially if the user  can't change the server settings (most cases.)

As a workaround for these issues, I've tested running a local proxy on my computer to strip out the x-frame-options header coming from the source server and it worked well on some cases. But setting up a proxy adds another layer of complexity to the setup.

## Updates

If you want to upgrade to the latest version, the only file you need to update is hamdash.html (do not overwrite your config.js file.)

### 2024.06.05 Changelog:

- Added image loading error handling
- Added workaround to prevent images being cached on the browser and not getting updated

### 2024.05.27 Changelog:

- Moved the configuration parts of the JavaScript code to its own file "config.js" so it is easy to upgrade after updates to the main code. Suggested by Lou KI5FTY.
- Improved menu usability

### 2024.05.25 Changelog:

- Removed dependencies to local installed fonts. Fonts now are loaded from Google Fonts directly to ensure consistency.
- Ability to add multiple images per position. Images are rotated automatically every 30 seconds.
- Autorefresh is now paused automatically when switching to a website (from menu) or when an image is zoomed-in to full screen
- Moved configuration variables to the top of the script and added extra commentary to ease the initial setup
- Added menu to the right of the page. Now the left menu has ham radio links and right menu has weather links

## Samples

![VA3HDL Sample Dashboard](https://github.com/VA3HDL/hamdashboard/blob/main/examples/dashboard_sample.png?raw=true)

![N4NBC Sample Dashboard](https://github.com/VA3HDL/hamdashboard/blob/main/examples/N4NBC-sample.jpg?raw=true)

![KM4ACK Sample Dashboard](https://github.com/VA3HDL/hamdashboard/blob/main/examples/KM4ACK-sample.png?raw=true)

![TI3GB Sample Dashboard](https://github.com/VA3HDL/hamdashboard/blob/main/examples/TI3GB-sample.png?raw=true)

![N5NG Sample Dashboard](https://github.com/VA3HDL/hamdashboard/blob/main/examples/N5NG-sample.png?raw=true)

### Dual menu example:
![Dual side Menu Sample Dashboard](https://github.com/VA3HDL/hamdashboard/blob/main/examples/DualMenu.png?raw=true)