/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package socket;

import java.io.File;
import java.io.IOException;
import java.net.HttpURLConnection;
import java.net.URI;
import java.net.URISyntaxException;
import java.net.URL;
import java.nio.file.Files;
import java.nio.file.StandardCopyOption;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.Part;
import org.hibernate.HibernateException;

/**
 *
 * @author sahan
 */
public class ProfileService {

    public boolean saveProfileImage(int userId, HttpServletRequest request) throws IOException, ServletException {

        Part profileImage = request.getPart("profileImage");

        String app_path = request.getServletContext().getRealPath("");
        String new_path = app_path.replace("build" + File.separator + "web", "web" + File.separator + "profile_images");

        File profileFolder = new File(new_path, String.valueOf(userId));
        if (!profileFolder.exists()) {
            profileFolder.mkdirs();
        }

        File file = new File(profileFolder, "profile_image.png");
        Files.copy(profileImage.getInputStream(), file.toPath(), StandardCopyOption.REPLACE_EXISTING);

        return true;
    }

    public static String getProfileUrl(int userId) {

        try {
            URL url = new URI("http://localhost:8080/HeyMan/profile_images/" + userId + "/profile_image.png").toURL();
            HttpURLConnection conn = (HttpURLConnection) url.openConnection();
            conn.setRequestMethod("HEAD");
            int responseCode = conn.getResponseCode();
            conn.connect();

            String profileImage;

            if (responseCode == HttpURLConnection.HTTP_OK) {
                profileImage = ChatService.URL + "/HeyMan/profile_images/" + userId + "/profile_image.png";
            } else {
                profileImage = "";
            }

            return profileImage;

        } catch (IOException | URISyntaxException | HibernateException e) {
            e.printStackTrace();
            return "";
        }

    }

}
