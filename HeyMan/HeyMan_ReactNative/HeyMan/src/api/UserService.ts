import { UserRegistrationData } from "../components/UserContext";

const API = process.env.EXPO_PUBLIC_APP_URL + "/HeyMan";

export const createNewAccount = async (useUserRegistration: UserRegistrationData) => {

    let formData = new FormData();
    formData.append("firstName", useUserRegistration.firstName);
    formData.append("lastName", useUserRegistration.lastName);
    formData.append("countryCode", useUserRegistration.countryCode);
    formData.append("contactNo", useUserRegistration.contactNo);
    formData.append("email", useUserRegistration.email);
    formData.append("vcode", useUserRegistration.vcode);

    const response = await fetch(API + "/UserController", {
        method: "POST",
        body: formData,
    });

    if (response.ok) {
        const json = await response.json();
        return json;
    } else {
        return "OOPS! Account creation failed!";
    }
}

export const updateUserEmail = async (useUserRegistration: UserRegistrationData) => {

    let formData = new FormData();
    formData.append("firstName", useUserRegistration.firstName);
    formData.append("lastName", useUserRegistration.lastName);
    formData.append("countryCode", useUserRegistration.countryCode);
    formData.append("contactNo", useUserRegistration.contactNo);
    formData.append("email", useUserRegistration.email);
    formData.append("vcode", useUserRegistration.vcode);

    const response = await fetch(API + "/UpdateUserEmailController", {
        method: "POST",
        body: formData,
    });

    if (response.ok) {
        const json = await response.json();
        return json;
    } else {
        return "OOPS! Account creation failed!";
    }
}

export const verifyAccount = async (useUserRegistration: UserRegistrationData) => {

    let formData = new FormData();
    formData.append("countryCode", useUserRegistration.countryCode);
    formData.append("contactNo", useUserRegistration.contactNo);
    formData.append("email", useUserRegistration.email);
    formData.append("vcode", useUserRegistration.vcode);

    const response = await fetch(API + "/VerifyAccount", {
        method: "POST",
        body: formData,
    });

    if (response.ok) {
        const json = await response.json();
        return json;
    } else {
        return "OOPS! Account creation failed!";
    }
}

export const uploadProfileImage = async (userId: string, imageUri: string) => {

    let formData = new FormData();
    formData.append("userId", userId);
    formData.append("profileImage", {
        uri: imageUri,
        type: "image/png",
        name: "profile_image.png"
    } as any);


    const response = await fetch(API + "/ProfileController", {
        method: "POST",
        body: formData,
    });

    if (response.ok) {
        return await response.json();
    } else {
        console.warn("OOPS! Profile image uploading failed!");
    }
}