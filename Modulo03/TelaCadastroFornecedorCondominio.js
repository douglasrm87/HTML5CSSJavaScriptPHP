 
 
/**
 * Aplica a máscara de CPF ao valor do input.
 * 
 * A expressão regular usada nesta função faz o seguinte:
 * 1. `/\D/g` - Remove todos os caracteres que não são dígitos.
 * 2. `/(\d{3})(\d)/, '$1.$2'` - Adiciona um ponto após os primeiros 3 dígitos.
 * 3. `/(\d{3})(\d)/, '$1.$2'` - Adiciona um ponto após os próximos 3 dígitos.
 * 4. `/(\d{3})(\d{1,2})$/, '$1-$2'` - Adiciona um hífen antes dos últimos 2 dígitos.
 * 
 * @param {HTMLInputElement} input - O campo de entrada onde o CPF será digitado.
 */
function aplicarMascaraCPF(input) {}

/**
 * Aplica a máscara de CNPJ ao valor do input.
 * 
 * A expressão regular usada nesta função faz o seguinte:
 * 1. `/\D/g` - Remove todos os caracteres que não são dígitos.
 * 2. `/(\d{2})(\d)/, '$1.$2'` - Adiciona um ponto após os primeiros 2 dígitos.
 * 3. `/(\d{3})(\d)/, '$1.$2'` - Adiciona um ponto após os próximos 3 dígitos.
 * 4. `/(\d{3})(\d)/, '$1/$2'` - Adiciona uma barra após os próximos 3 dígitos.
 * 5. `/(\d{4})(\d{1,2})$/, '$1-$2'` - Adiciona um hífen antes dos últimos 2 dígitos.
 * 
 * @param {HTMLInputElement} input - O campo de entrada onde o CNPJ será digitado.
 */
function aplicarMascaraCNPJ(input) {}

/**
 * Valida um número de CPF.
 * 
 * @param {string} cpf - O CPF a ser validado (pode conter caracteres não numéricos).
 * @returns {boolean} Retorna true se o CPF for válido, caso contrário, false.
 */
function validarCPF(cpf) {}

/**
 * Valida um número de CNPJ.
 * 
 * @param {string} cnpj - O CNPJ a ser validado (pode conter caracteres não numéricos).
 * @returns {boolean} Retorna true se o CNPJ for válido, caso contrário, false.
 */
function validarCNPJ(cnpj) {}

/**
 * Valida o formulário de cadastro, verificando se o CPF ou CNPJ informado é válido
 * conforme o tipo de pessoa selecionado.
 * 
 * @returns {boolean} Retorna true se o formulário for válido, caso contrário, false.
 */
function validarFormulario() {}
// Máscara para CPF e CNPJ
function aplicarMascaraCPF(input) {
    // Aplica a máscara de CPF ao valor do campo de entrada, formatando como 000.000.000-00
    input.value = input.value
        .replace(/\D/g, '') // Remove todos os caracteres que não são dígitos
        .replace(/(\d{3})(\d)/, '$1.$2')    // Adiciona ponto após os primeiros 3 dígitos
        .replace(/(\d{3})(\d)/, '$1.$2')    // Adiciona ponto após os segundos 3 dígitos
        .replace(/(\d{3})(\d{1,2})$/, '$1-$2'); // Adiciona hífen antes dos últimos 2 dígitos
}

function aplicarMascaraCNPJ(input) {
    input.value = input.value
        .replace(/\D/g, '') // Remove todos os caracteres que não são dígitos
        .replace(/(\d{2})(\d)/, '$1.$2')    // Adiciona ponto após os primeiros 2 dígitos
        .replace(/(\d{3})(\d)/, '$1.$2')    // Adiciona ponto após os próximos 3 dígitos
        .replace(/(\d{3})(\d)/, '$1/$2')    // Adiciona barra após os próximos 3 dígitos
        .replace(/(\d{4})(\d{1,2})$/, '$1-$2'); // Adiciona hífen antes dos últimos 2 dígitos
}



// Validação de CPF
function validarCPF(cpf) {
    cpf = cpf.replace(/[^\d]+/g,'');
    if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) return false;
    let soma = 0, resto;
    for (let i=1; i<=9; i++) soma += parseInt(cpf.substring(i-1, i)) * (11 - i);
    resto = (soma * 10) % 11;
    if ((resto === 10) || (resto === 11)) resto = 0;
    if (resto !== parseInt(cpf.substring(9, 10))) return false;
    soma = 0;
    for (let i=1; i<=10; i++) soma += parseInt(cpf.substring(i-1, i)) * (12 - i);
    resto = (soma * 10) % 11;
    if ((resto === 10) || (resto === 11)) resto = 0;
    if (resto !== parseInt(cpf.substring(10, 11))) return false;
    return true;
}

// Validação de CNPJ
function validarCNPJ(cnpj) {
    cnpj = cnpj.replace(/[^\d]+/g,'');
    if (cnpj.length !== 14) return false;
    if (/^(\d)\1+$/.test(cnpj)) return false;
    let tamanho = cnpj.length - 2;
    let numeros = cnpj.substring(0, tamanho);
    let digitos = cnpj.substring(tamanho);
    let soma = 0;
    let pos = tamanho - 7;
    for (let i = tamanho; i >= 1; i--) {
        soma += numeros.charAt(tamanho - i) * pos--;
        if (pos < 2) pos = 9;
    }
    let resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
    if (resultado !== parseInt(digitos.charAt(0))) return false;
    tamanho = tamanho + 1;
    numeros = cnpj.substring(0, tamanho);
    soma = 0;
    pos = tamanho - 7;
    for (let i = tamanho; i >= 1; i--) {
        soma += numeros.charAt(tamanho - i) * pos--;
        if (pos < 2) pos = 9;
    }
    resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
    if (resultado !== parseInt(digitos.charAt(1))) return false;
    return true;
}

// Validação do formulário
function validarFormulario() {
    let tipoPessoa = document.querySelector('input[name="tipoPessoa"]:checked');
    let cpf = document.getElementById('cpf').value;
    let cnpj = document.getElementById('cnpj').value;
    let erroCPF = document.getElementById('erroCPF');
    let erroCNPJ = document.getElementById('erroCNPJ');
    erroCPF.textContent = '';
    erroCNPJ.textContent = '';

    if (tipoPessoa && tipoPessoa.value === 'fisica') {
        if (!validarCPF(cpf)) {
            erroCPF.textContent = 'CPF inválido.';
            document.getElementById('cpf').focus();
            return false;
        }
    }
    if (tipoPessoa && tipoPessoa.value === 'juridica') {
        if (!validarCNPJ(cnpj)) {
            erroCNPJ.textContent = 'CNPJ inválido.';
            document.getElementById('cnpj').focus();
            return false;
        }
    }
    return true;
} 