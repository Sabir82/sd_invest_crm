import { BASE_URL } from "./config";

// Get url //
export  const GetRoute = async (route) => {
    return await fetch(
      BASE_URL + `${route}`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
        },
      }
    )
      .then((resD) => resD.json())
      .then((reD) => reD)
      .catch((err) => err);
  };

//  POST ROUTE //

export const PostRoute = async (route,body) => {
    return await fetch(BASE_URL + route, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    })
      .then((resp) => resp.json())
      .then((reD) => reD)
      .catch((err) => err);
  }; 