const { select } = require("@inquirer/prompts")

const start = async () => {

    while (true) {

        const option = await select({
            message: "Menu >",
            choices: [
                {
                    name: 'Cadastrar Metas',
                    value: 'cadastrar',
                },
                {
                    name: 'Sair',
                    value: 'sair',
                }
            ]
        })

        switch (option) {
            case 'cadastrar':
                break
            case 'listar':
                break
            case 'sair':
                return
        }
    }
}

start()