const CURSOSS = new Curso();

document.addEventListener("DOMContentLoaded", event => {

    document.querySelector("#curso-insert").addEventListener("submit", event => {
        CURSOSS.insert({
            nombre: event.target.nombre.value,
            descripcion: event.target.descripcion.value,
            numero_modulos: event.target.numero_modulos.value,
            categoria: event.target.categoria.value,
        }).then(curso => {
            event.target.reset();
            //loadCursoTable(); No se coloca pq la info se actualizará en otra página
            alert('El curso fue registrado exitosamente');
        }).catch(() => {
            alert('El curso "' + curso.nombre_curso + '" fue registrado');
        });
    }, false);

}, false);

