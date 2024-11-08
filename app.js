import{buscarDados} from'./componentes/api.js';
import{mostrarCard} from'./componentes/ui.js';
async function init() {
    try{
        const dadosExternos = await buscarDados();
        const appContainer = document.getElementById('app');
        mostrarCard(appContainer,dadosExternos);
    } catch(error){
        console.error('Erro ao buscar os dados:', error);
    }
}
init ();
