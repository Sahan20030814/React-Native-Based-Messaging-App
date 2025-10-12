/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/JSP_Servlet/Servlet.java to edit this template
 */
package controller;

import com.google.gson.Gson;
import com.google.gson.JsonObject;
import entity.User;
import java.io.IOException;
import java.util.Date;
import javax.servlet.ServletException;
import javax.servlet.annotation.MultipartConfig;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import model.Mail;
import model.Util;
import org.hibernate.Criteria;
import org.hibernate.Session;
import org.hibernate.criterion.Restrictions;
import util.HibernateUtil;

/**
 *
 * @author sahan
 */
@MultipartConfig
@WebServlet(name = "UserController", urlPatterns = {"/UserController"})
public class UserController extends HttpServlet {

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

        String firstName = request.getParameter("firstName");
        String lastName = request.getParameter("lastName");
        String countryCode = request.getParameter("countryCode");
        String contactNo = request.getParameter("contactNo");

        JsonObject responseObject = new JsonObject();
        responseObject.addProperty("status", false);
        Gson gson = new Gson();

        if (firstName.isEmpty()) {
            responseObject.addProperty("message", "First name is required!");
        } else if (firstName.length() > 45) {
            responseObject.addProperty("notification", "First name must contain less than 45 characters!");
        } else if (lastName.isEmpty()) {
            responseObject.addProperty("message", "Last name is required!");
        } else if (lastName.length() > 45) {
            responseObject.addProperty("notification", "Last name must contain less than 45 characters!");
        } else if (countryCode.isEmpty()) {
            responseObject.addProperty("message", "Country code is required!");
        } else if (contactNo.isEmpty()) {
            responseObject.addProperty("message", "Contact number is required!");
        } else {

            Session s = HibernateUtil.getSessionFactory().openSession();
            Criteria c1 = s.createCriteria(User.class);
            c1.add(Restrictions.eq("country_code", countryCode));
            c1.add(Restrictions.eq("contact_no", contactNo));
            User user = (User) c1.uniqueResult();

            if (user != null) {

                if (user.getEmail() == null || user.getEmail() == "" || user.getEmail().equals("") || user.getEmail().isEmpty()) {

                    user.setFirst_name(firstName);
                    user.setLast_name(lastName);
                    user.setUpdatedAt(new Date());
                    s.update(user);
                    s.beginTransaction().commit();

                    responseObject.addProperty("message", "no_email_added");
                    responseObject.addProperty("status", true);
                } else {

                    String email = user.getEmail();
                    final String verification_code = Util.generateCode();

                    new Thread(new Runnable() {
                        @Override
                        public void run() {
                            Mail.sendMail(email, "HeyMan - Account Verification", "<h1>Your verification code: <span style='color:red;'>" + verification_code + "</span></h1>");
                        }
                    }).start();

                    user.setFirst_name(firstName);
                    user.setLast_name(lastName);
                    user.setUpdatedAt(new Date());
                    user.setVcode(verification_code);
                    s.update(user);
                    s.beginTransaction().commit();

                    responseObject.addProperty("email", email);
                    responseObject.addProperty("message", "email_added");
                    responseObject.addProperty("status", true);
                }

            } else {
                user = new User(firstName, lastName, countryCode, contactNo, "", "");
                user.setCreatedAt(new Date());
                user.setUpdatedAt(new Date());

                s.save(user);
                s.beginTransaction().commit();

                responseObject.addProperty("message", "no_email_added");
                responseObject.addProperty("status", true);
            }

            s.close();
        }

        response.setContentType("application/json");
        response.getWriter().write(gson.toJson(responseObject));
    }
}
