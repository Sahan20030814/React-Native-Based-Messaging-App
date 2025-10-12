/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/JSP_Servlet/Servlet.java to edit this template
 */
package controller;

import com.google.gson.Gson;
import com.google.gson.JsonObject;
import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.annotation.MultipartConfig;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.Part;
import socket.ProfileService;

/**
 *
 * @author sahan
 */
@MultipartConfig
@WebServlet(name = "ProfileController", urlPatterns = {"/ProfileController"})
public class ProfileController extends HttpServlet {

    @Override
    protected void doPost(HttpServletRequest requset, HttpServletResponse response) throws ServletException, IOException {

        Part profileImage = requset.getPart("profileImage");
        int userId = Integer.parseInt(requset.getParameter("userId"));

        Gson gson = new Gson();
        JsonObject responseObject = new JsonObject();
        responseObject.addProperty("status", Boolean.FALSE);

        if (userId == 0) {
            responseObject.addProperty("message", "OPPS! User not found");
        } else if (profileImage == null) {
            responseObject.addProperty("message", "Upload your profile image");
        } else {
            boolean isSuccess = new ProfileService().saveProfileImage(userId, requset);

            if (isSuccess) {
                responseObject.addProperty("message", "Profile image updated successfully.");
                responseObject.addProperty("status", Boolean.TRUE);
            } else {
                responseObject.addProperty("message", "Profile image uploading failed.");
            }
        }

        response.setContentType("application/json");
        response.getWriter().write(gson.toJson(responseObject));
    }

}
