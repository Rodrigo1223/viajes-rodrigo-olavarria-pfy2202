const BASE_URL = import.meta.env.BASE_URL;

export async function obtenerDestinos(signal) {
  try {
    const response = await fetch(`${BASE_URL}api/destinos`, { signal });

    if (!response.ok) {
      let mensajeBackend = `Error del servidor (${response.status})`;
      try {
        const errorData = await response.json();
        if (errorData?.message) mensajeBackend = errorData.message;
      } catch {
        // Si no viene JSON, conservamos el mensaje HTTP
      }
      throw new Error(mensajeBackend);
    }

    return await response.json();
  } catch (error) {
    if (error.name === 'AbortError') {
      throw error;
    }
    if (error.message === 'Failed to fetch') {
      throw new Error('Error de conexión de red. Verifica tu internet o el servicio simulado e intenta nuevamente.');
    }
    throw error;
  }
}