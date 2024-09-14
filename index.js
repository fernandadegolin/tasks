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

    metas.forEach((meta) => {
        meta.checked = false
    })


    if (respostas.length === 0) {
        console.log('Nenhuma meta selecionada')
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
        console.log('Não temos metas realizadas')
        return
    }

    await select({
        message: `Metas realizadas -> ${realizadas.lenght}`,
        choices: [...realizadas],
    })
}

const metasAbertas = async () => {
    const abertas = metas.filter((meta) => {
        return !meta.checked
    })


    if (abertas.length === 0) {
        console.log('Não temos metas abertas')
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
    console.log('Meta removida com sucesso!')
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
                console.log(metas)
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

