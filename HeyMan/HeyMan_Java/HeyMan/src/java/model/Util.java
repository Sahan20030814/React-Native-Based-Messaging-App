package model;

public class Util {

    public static String generateCode() {
        int i = (int) (Math.random() * 100000);
        return String.format("%05d", i);
    }

    public static boolean isEmailValid(String email) {
        return email.matches("^[a-zA-Z0-9._%+-]+@gmail\\.com$");
    }

}
