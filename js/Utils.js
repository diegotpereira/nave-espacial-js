export const lerp = (a, b, n) => (1 - n) * a + n * b;

export const rand = (min = 0, max = 1) => Math.random() * (max - min) + min;

export const createDomNode = (className, tag = 'div') => {

    const elemento = document.createElement(tag);

    if (className) {
        
        elemento.classList.add(...className.split(' '));
        
    }

    return elemento;
}

export const addDomNode = (parent, { className, tag, text}) => {

    const filha = createDomNode(className, tag);

    if (text) {
        
        filha.textContent = text;
    }

    parent.appendChild(filha);

    return filha;
}

export const objetoDeEstiloParaTextoCss = style => {

    return Object
                .entries(style)
                .map(s => s.join(':'))
                .join(';')
}