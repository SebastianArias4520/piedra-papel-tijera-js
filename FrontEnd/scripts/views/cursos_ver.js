const CURSOS = new Curso();

document.addEventListener("DOMContentLoaded", event => {

    function loadCursoTable() {
        const tbody = document.querySelector("tbody");
        tbody.innerHTML = "";
        CURSOS.findAll().then(cursos => {
            cursos.forEach(curso => {
                tbody.innerHTML += `
                    <tr>
                        <td>${curso.id_curso}</td>
                        <td>${curso.nombre_curso}</td>
                        <td>${curso.descripcion_curso}</td>
                        <td>${curso.numero_modulos}</td>
                        <td>${curso.categoria_id_categoria}</td>
                        <td>
                            <button type="button">Eliminar</button>
                        </td>
                    </tr>    
                `;
            });
        });
    };

    loadCursoTable();

}, false);

