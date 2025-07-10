
// Usuário e senha válidos (exemplo)
const usuarioValido = "admin";
const senhaValida = "123456";

function validarLogin(usuario, senha) {
    const usuarioValido = "admin";
    const senhaValida = "123456";
    if (usuario === usuarioValido && senha === senhaValida) {
        alert('Login realizado com sucesso!');
        return true;
    } else {
        alert('Usuário ou senha incorretos.');
        return false;
    }
}
