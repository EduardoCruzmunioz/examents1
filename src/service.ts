import type { Pokemon } from "./interfaces/pokemon_interfaces";

const API_URL = "https://pokeapi.co/api/v2/pokemon/";

export class ApiError extends Error {
  public readonly status: number;
  public readonly statusText: string;

  constructor(
    message: string,
    status: number = 500,
    statusText: string = "Internal Error",
  ) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.statusText = statusText;
    Object.setPrototypeOf(this, ApiError.prototype);
  }
}

export class NetworkError extends Error {
  constructor(
    message: string = "No se ha podido conectar con el servidor tras varios intentos.",
  ) {
    super(message);
    this.name = "NetworkError";
    Object.setPrototypeOf(this, NetworkError.prototype);
  }
}

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function getPokemons(
  maxRetries: number = 3,
  delayMs: number = 1000,
): Promise<Pokemon[]> {
  let lastError: unknown;

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      console.log(`[API] Intento ${attempt} de ${maxRetries}...`);
      let response;
      let data: Pokemon[] = [];

      for (let i = 1; i < 21; i++) {
        response = await fetch(`${API_URL}${i}`);

        if (!response.ok) {
          throw new ApiError(
            `El servidor de PokeApi devolvió el código HTTP ${response.status} (${response.statusText})`,
            response.status,
            response.statusText,
          );
        }
        data.push(await response.json());
      }
      return data;
    } catch (error) {
      lastError = error;
      console.warn(
        `[API] Falló el intento ${attempt} de ${maxRetries}:`,
        error,
      );

      if (attempt < maxRetries) {
        console.log(
          `[API] Esperando ${delayMs}ms antes del intento ${attempt + 1}...`,
        );
        await delay(delayMs);
      }
    }
  }

  if (lastError instanceof ApiError) {
    throw lastError;
  }
  const errorMsg =
    lastError instanceof Error ? lastError.message : "Error desconocido";
  throw new NetworkError(
    `Se agotaron los ${maxRetries} intentos sin éxito: ${errorMsg}`,
  );
}
