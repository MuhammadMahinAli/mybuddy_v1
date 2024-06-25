export const apiFetch = async (url, method, body) => {
  let response = null;
  //get api
  if (method === "GET") {
    response = await fetch(url);
  } //post api
  else if (method === "POST") {
    response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
  }
   //patch api
  else if (method === "PATCH") {
    response = await fetch(url, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
  } //delete api
  else if (method === "DELETE") {
    response = await fetch(url, {
      method: "DELETE",
      body: body ? JSON.stringify(body) : null,
    });
  }
  const data = await response.json();
  return data;
};

