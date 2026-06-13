import qs from "qs";
import { CacheLife } from "next/dist/server/use-cache/cache-life";
import { cacheLife } from "next/cache";
export const STRAPI_BASE_URL = process.env.STRAPI_BASE_URL || "http://localhost:1337";

const QUERY_HOME_PAGE ={
populate: {
  sections: {
    on: {
      "layout.hero-section":{
        populate:{
          imagen:{
            fields:["url","alternativeText"]
          },
          link:{
            populate: true
          }
        }
      
      }
    }
  }
},
}
export async function getHomePage() {
  const query = qs.stringify(QUERY_HOME_PAGE);

  const url = `${STRAPI_BASE_URL}/api/home-page?${query}`;

  console.log("URL:", url);

  const response = await fetch(url);

  console.log("STATUS:", response.status);

  if (!response.ok) {
    const errorText = await response.text();
    console.log("ERROR BODY:", errorText);

    throw new Error(
      `Strapi request failed: ${response.status}`
    );
  }

  return await response.json();
}

export async function getStrapiData(url: string) {
    try {
        const response = await fetch(`${STRAPI_BASE_URL}/${url}`);

        if (!response.ok) {
            throw new Error("HTTP error: status" + response.status);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.log(error);
        return null;
    }
}

export async function registerUserService(userData: object){
    const url = `${STRAPI_BASE_URL}/api/auth/local/register`
    console.log("STRAPI_BASE_URL:", process.env.STRAPI_BASE_URL);
    console.log("URL:", url);
    try {
        const response = await fetch(url,{
            method: "POST", 
            headers:{"Content-Type": "application/json"}, 
            body: JSON.stringify(userData)
    })
    
    const data = await response.json()
    console.log(data)
    return data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export async function loginUserService(loginData: object) {
    const url = `${STRAPI_BASE_URL}/api/auth/local`

    try {
        const response = await fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(loginData)
        })

        const data = await response.json()
        console.log(data)
        return data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}
