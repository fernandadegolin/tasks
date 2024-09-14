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

    metas.forEach((meta) => {
        meta.checked = false
    })

    respostas.forEach((resposta) => {
        const meta = metas.find((m) => m.value === resposta)
        if (meta) {
            meta.checked = true
        }
    })
}

const metasRealizadas = async () => { 
    const realizadas = metas.filter((meta)=>{
        return meta.checked
    })

    if(realizadas.length === 0){
        console.log('Não temos metas realizadas')
        return
    }

    await select({
        message: 'Metas realizadas',
        choices: [...realizadas],
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
                    name: 'Metas realizadas',
                    value: 'realizadas',
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
            case 'realizadas':
                await metasRealizadas()
                break
            case 'sair':
                return
        }
    }
}

start()

