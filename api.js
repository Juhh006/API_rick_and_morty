export async function buscarDados() {
    if(!response.ok){
        throw new Error('Sem rede');
    }
    return response.json();
}