function Consumir() {
  const contenedor = document.getElementById('resultados');
  contenedor.innerHTML = 'Cargando datos e imágenes...';

  fetch('https://ws-public.interpol.int/notices/v1/red')
    .then(response => response.json())
    .then(data => {
      const notices = data._embedded ? data._embedded.notices : [];
      let contenidoHtml = '';
      
      notices.forEach(user => {
        // 1. Validar si el usuario tiene una imagen disponible en la API
        let urlImagen = '';
        if (user._links && user._links.thumbnail && user._links.thumbnail.href) {
          urlImagen = user._links.thumbnail.href;
        } else {
          // Si no tiene imagen, ponemos una de relleno (placeholder)
          urlImagen = 'https://via.placeholder.com/100?text=Sin+Foto';
        }

        // 2. Agregamos la etiqueta <img> al HTML. 
        // Usé 'display: flex' para poner la imagen al lado del texto.
        contenidoHtml += `
          <div style="border: 1px solid #ddd; margin: 10px 0; padding: 15px; border-radius: 5px; display: flex; align-items: center; gap: 15px;">
            
            <img src="${urlImagen}" alt="Foto de ${user.name}" style="width: 100px; height: auto; border-radius: 5px; object-fit: cover;" />
            
            <div>
              <p style="margin: 0 0 5px 0;"><strong>Nombre:</strong> ${user.name}${user.forename || ''}</p>
              <p style="margin: 0;"><strong>Nacimiento:</strong> ${user.date_of_birth || 'N/A'}</p>
            </div>
            
          </div>
        `;
      });

      contenedor.innerHTML = contenidoHtml;
    })
    .catch(error => {
      console.log("Error:", error);
      contenedor.innerHTML = 'Hubo un error al cargar la información.';
    });
}