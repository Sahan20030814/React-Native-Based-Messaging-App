/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/JSP_Servlet/Servlet.java to edit this template
 */
package controller;

import com.google.gson.Gson;
import com.google.gson.JsonObject;
import entity.User;
import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.annotation.MultipartConfig;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import model.Mail;
import model.Util;
import static model.Util.isEmailValid;
import org.hibernate.Criteria;
import org.hibernate.Session;
import org.hibernate.criterion.Restrictions;
import util.HibernateUtil;

/**
 *
 * @author sahan
 */
@MultipartConfig
@WebServlet(name = "VerifyAccount", urlPatterns = {"/VerifyAccount"})
public class VerifyAccount extends HttpServlet {

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

        String countryCode = request.getParameter("countryCode");
        String contactNo = request.getParameter("contactNo");
        String email = request.getParameter("email");
        String vcode = request.getParameter("vcode");

        JsonObject responseObject = new JsonObject();
        responseObject.addProperty("status", false);
        Gson gson = new Gson();

        if (countryCode.isEmpty()) {
            responseObject.addProperty("message", "Something went wrong. Country code wasn't filled!");
        } else if (contactNo.isEmpty()) {
            responseObject.addProperty("message", "Something went wrong. Contact number wasn't filled!");
        } else if (email.isEmpty()) {
            responseObject.addProperty("message", "Something went wrong. Email address wasn't filled!");
        } else if (!isEmailValid(email)) {
            responseObject.addProperty("message", "Something went wrong. Entered email address is invalid!");
        } else {

            Session s = HibernateUtil.getSessionFactory().openSession();
            Criteria c1 = s.createCriteria(User.class);
            c1.add(Restrictions.eq("country_code", countryCode));
            c1.add(Restrictions.eq("contact_no", contactNo));
            c1.add(Restrictions.eq("email", email));
            User user = (User) c1.uniqueResult();

            if (user != null) {

                if (user.getVcode().equals(vcode)) {
                    responseObject.add("user", gson.toJsonTree(user));
                    responseObject.addProperty("userId", user.getId());
                    responseObject.addProperty("userName", user.getFirst_name() + " " + user.getLast_name());
                    responseObject.addProperty("countryCode", user.getCountry_code());
                    responseObject.addProperty("contactNo", user.getContact_no());
                    responseObject.addProperty("status", true);
                } else {
                    responseObject.addProperty("message", "Incorrect verification code!");
                }

            } else {
                responseObject.addProperty("message", "Something went wrong! Please go back & fill required data again!");
            }

            s.close();
        }

        response.setContentType("application/json");
        response.getWriter().write(gson.toJson(responseObject));
    }
}
