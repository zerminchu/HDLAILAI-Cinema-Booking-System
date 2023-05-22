import axios from "axios";
import { describe, expect, test } from "vitest";

describe("Sprint 1 tests", () => {
  test("Creates a new user profile", async () => {
    const response = await axios.post(
      "http://localhost:8080/createuserprofile/add",
      {
        profileName: "Test profile",
        permission: "User Admin",
      }
    );
    // Ensure the response stat
    expect(response.status).toBe(200);
  });

  test("Creates a new user admin account", async () => {
    const response = await axios.post(
      "http://localhost:8080/createuseraccount/add",
      {
        email: "test@gmail.com",
        password: "123456",
        name: "test user",
        profile: { id: 4 },
      }
    );

    expect(response.status).toBe(200);
  });

  test("Logs in a test user admin", async () => {
    const response = await axios.post("http://localhost:8080/login", {
      email: "test@gmail.com",
      password: "123456",
      profile: { id: 4 },
    });

    expect(response.status).toBe(200);
  });

  test("Logs out a test user", async () => {
    const response = await axios.post("http://localhost:8080/logout");

    expect(response.status).toBe(200);
  });

  test("Loads all user profiles as an array", async () => {
    const userProfiles = (
      await axios.get("http://localhost:8080/viewuserprofile/all")
    ).data;

    expect(Array.isArray(userProfiles)).toBe(true);
  });

  test("Loads all user accounts as an array", async () => {
    const userAccounts = (
      await axios.get("http://localhost:8080/viewuseraccount/all")
    ).data;

    expect(Array.isArray(userAccounts)).toBe(true);
  });

  /* test("Loads the details of a single user profile", async () => {
    const userProfile = (
      await axios.get("http://localhost:8080/viewuserprofile/1")
    ).data;
    // Ensure that returned object has the following properties
    expect(userProfile).toHaveProperty("id");
    expect(userProfile).toHaveProperty("profileName"); // assert that the key exists
    expect(userProfile).toHaveProperty("permission");
    expect(userProfile).toHaveProperty("suspended");
  });

  test("Loads the details of a single user account", async () => {
    const userAccount = (
      await axios.get("http://localhost:8080/viewuseraccount/1")
    ).data;

    // Ensure that returned object has the following properties
    expect(userAccount).toHaveProperty("id");
    expect(userAccount).toHaveProperty("name");
    expect(userAccount).toHaveProperty("email");
    expect(userAccount).toHaveProperty("password");
    expect(userAccount).toHaveProperty("profile.id");
    expect(userAccount).toHaveProperty("profile.profileName");
    expect(userAccount).toHaveProperty("profile.permission");
    expect(userAccount).toHaveProperty("profile.suspended");
  }); */

  test("Updates a user profile of a given id", async () => {
    const response = await axios.put(
      "http://localhost:8080/updateuserprofile/update/1",
      {
        id: 1,
        profileName: "new name",
        permission: "Cinema Manager",
      }
    );

    expect(response.status).toBe(200);
  });

  test("Updates a user account of a given id", async () => {
    const response = await axios.put(
      "http://localhost:8080/updateuseraccount/update/1",
      {
        id: 1,
        name: "UpdatedUser",
        password: "1234567",
        email: "update@gmail.com",
        profile: {
          id: 1,
        },
      }
    );

    expect(response.status).toBe(200);
  });

  test("Suspends a user profile of a given id", async () => {
    const response = await axios.delete(
      "http://localhost:8080/suspenduserprofile/1"
    );

    expect(response.status).toBe(200);
  });

  test("Unsuspends a user profile of a given id", async () => {
    const response = await axios.put(
      "http://localhost:8080/suspenduserprofile/unsuspend/1"
    );

    expect(response.status).toBe(200);
  });

  test("Suspends a user account of a given id", async () => {
    const response = await axios.delete(
      "http://localhost:8080/suspenduseraccount/1"
    );

    expect(response.status).toBe(200);
  });

  test("Unsuspends a user account of a given id", async () => {
    const response = await axios.put(
      "http://localhost:8080/suspenduseraccount/unsuspend/1"
    );

    expect(response.status).toBe(200);
  });
});
