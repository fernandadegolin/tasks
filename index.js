const { select, input, checkbox } = require("@inquirer/prompts")

let meta = {
    value: 'Descer o lixo',
    checked: false
}

let metas = [meta]

const cadastrarMeta = async () => {

    const meta = await input({ message: 'Digite sua meta: ' })

    if (meta.length === 0) {
        console.log('Sua meta não pode ser vazia')
        return
    }

    metas.push({ value: meta, checked: false })
}

const listarMetas = async () => {
    const respostas = await checkbox({
        message: ">",
        choices: [...metas,],
        // instructions: false
    })
    

    if (respostas.length === 0) {
        console.log('Nenhuma meta selecionada')
        return
    }

    metas.find((meta)=>{
        meta.checked = false
    })

    respostas.forEach((resposta) => {
        const meta = metas.find((m) => {
            return m.value === resposta
        })
        meta.checked = true
    })
}


const start = async () => {

    while (true) {

        const option = await select({
            message: "Menu >",
            choices: [
                {
                    name: 'Cadastrar metas',
                    value: 'cadastrar',
                },
                {
                    name: 'Listar metas',
                    value: 'listar',
                },
                {
                    name: 'Sair',
                    value: 'sair',
                }
            ]
        })

        switch (option) {
            case 'cadastrar':
                await cadastrarMeta()
                console.log(metas)
                break
            case 'listar':
                await listarMetas()
                break
            case 'sair':
                return
        }
    }
}

start()