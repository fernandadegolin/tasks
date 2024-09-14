const { select, input, checkbox } = require("@inquirer/prompts")

let mensagem = 'Bem vindo!'

let meta = {
    value: 'Descer o lixo',
    checked: false
}

let metas = [meta]


const cadastrarMeta = async () => {

    const meta = await input({ message: 'Digite sua meta: ' })

    if (meta.length === 0) {
        mensagem ='Sua meta não pode ser vazia'
        return
    }

    metas.push({ value: meta, checked: false })

    mensagem = "Meta cadastrada com sucesso"
}

const listarMetas = async () => {
    const respostas = await checkbox({
        message: ">",
        choices: [...metas,],
    })

    metas.forEach((meta) => {
        meta.checked = false
    })


    if (respostas.length === 0) {
       mensagem='Nenhuma meta selecionada'
        return
    }

    respostas.forEach((resposta) => {
        const meta = metas.find((m) => m.value === resposta)
        if (meta) {
            meta.checked = true
        }
    })
}

const metasRealizadas = async () => {
    const realizadas = metas.filter((meta) => {
        return meta.checked
    })

    if (realizadas.length === 0) {
        mensagem ='Não temos metas realizadas'
        return
    }

    await select({
        message: `Metas realizadas -> ${realizadas.length}`,
        choices: [...realizadas],
    })
}

const metasAbertas = async () => {
    const abertas = metas.filter((meta) => {
        return !meta.checked
    })


    if (abertas.length === 0) {
        mensagem ='Não temos metas abertas'
        return
    }

    await select({
        message: `Metas abertas -> ${abertas.length}`,
        choices: [...abertas]
    })
}

const deletarMeta = async () => {
    if (metas.length == 0) {
        mensagem = "Não existem metas!"
        return
    }

    const metasDesmarcadas = metas.map((meta) => {
        return { value: meta.value, checked: false }
    })

    const itemsADeletar = await checkbox({
        message: "Selecione item para deletar",
        choices: [...metasDesmarcadas],
        instructions: false,
    })

    if (itemsADeletar.length == 0) {
        mensagem = "Nenhum item para deletar!"
        return
    }

    itemsADeletar.forEach((item) => {
        metas = metas.filter((meta) => {
            return meta.value != item
        })
    })
    mensagem = 'Meta removida com sucesso!'
}

const mostrarMensagem = () => {
    console.clear();

    if (mensagem != "") {
        console.log(mensagem)
        console.log("")
        mensagem = ""
    }
}

const start = async () => {
    

    while (true) {
        mostrarMensagem()

        const option = await select({
            message: "Menu >",
            choices: [
                {
                    name: 'Cadastrar metas',
                    value: 'cadastrar',
                },
                {
                    name: 'Deletar metas',
                    value: 'delete',
                },
                {
                    name: 'Metas realizadas',
                    value: 'realizadas',
                },
                {
                    name: 'Metas abertas',
                    value: 'abertas',
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

                break
            case 'delete':
                await deletarMeta()
                break
            case 'listar':
                await listarMetas()
                break
            case 'realizadas':
                await metasRealizadas()
                break
            case 'abertas':
                await metasAbertas()
                break
            case 'sair':
                return
        }
    }
}

start()

