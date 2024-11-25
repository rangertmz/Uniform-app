
interface ValidationData {
    genero: string | null;
    talla: string;
    total: string;
    proveedor: string;
    coste: string;
    coste_total: string;
    user: string | null;
  }
  
  export const validateFields = (data: ValidationData): { valid: boolean; errors: string[] } => {
    const { genero, talla, total, proveedor, coste, coste_total, user } = data;
  
    const isNumber = (value: string) => {
      return !isNaN(Number(value)) && value.trim() !== "";
    };
  
    const errors: string[] = [];
  
    if (genero === null) errors.push("Por favor selecciona un género.");
    if (talla.trim() === "") errors.push("Por favor selecciona una talla.");
    if (total.trim() === "" || !isNumber(total)) errors.push("Por favor ingresa un número válido para el total de uniformes.");
    if (proveedor.trim() === "") errors.push("Por favor selecciona un proveedor.");
    if (coste.trim() === "" || !isNumber(coste)) errors.push("Por favor ingresa un número válido para el coste por unidad.");
    if (coste_total.trim() === "" || !isNumber(coste_total)) errors.push("Por favor ingresa un número válido para el coste total.");
    if (user === null) errors.push("Por favor asegúrate de estar registrado.");
  
    return {
      valid: errors.length === 0,
      errors,
    };
  };
  