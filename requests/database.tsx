import axios from "axios";

const url = "http://10.0.0.13:4000";

export const verifyLogin = async (nombre: string, contraseña: string) => {
  try {
    const response = await fetch(`${url}/Login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nombre, contraseña }),
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Error de conexión");
    }
    const data = await response.json();
    console.log("Token recibido:", data.token);
    return data;
  } catch (error) {
    
    throw error;
  }
};
export const registerUser = async (nombre: string, contraseña: string) => {
  try {
    const response = await fetch(`${url}/Register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nombre, contraseña }),
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Error de conexión");
    }
    const data = await response.json();
    
    return data;
  } catch (error) {
    
    throw error;
  }
};
export const getAllUniforms = async (token: string) => {
  try {
    const response = await fetch(`${url}/Uniforms`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    const responseText = await response.text();

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Error desconocido');
    }

    const data = JSON.parse(responseText);
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getUniforms = async (level: string, token: string) => {
  try {
    const response = await fetch(`${url}/${level}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    const responseText = await response.text();

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Error desconocido');
    }

    const data = JSON.parse(responseText);
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
export const getLastUniform = async (level: string, token: string) => {
  try {
    const response = await fetch(`${url}/${level}/last`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    const responseText = await response.text();

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Error desconocido');
    }

    const data = JSON.parse(responseText);
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};


export const createUniforms = async (level:string, token: any, data: any) => {
  try {
    const response = await fetch(`${url}/${level}`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const text = await response.text();
    

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Error desconocido');
    }

    const responseData = await response.json();
    return responseData;
  } catch (error) {
    console.log(error);
    throw error;
  }
};


