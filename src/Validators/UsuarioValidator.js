const { default: mongoose } = require("mongoose");
const { z } = require("zod");
const { validateRequest } = require("zod-express-middleware");


const create = validateRequest({
    body: z.object({
        nome: z.string({required_error: "O nome é obrigatório"}),
        email: z
        .string({required_error: "O email é obrigatório"})
        .email("O email é obrigatório"),
        senha: z.string({required_error: "A senha é obrigatório"}),
        endereco: z.string({required_error: "O endereo é obrigatório"}),
        descricao: z.string({required_error: "A descrição é obrigatório"}),
    }),
});

const destroy = validateRequest({
    params: z.object({
        id: z.custom(mongoose.isValidObjectId, "O id não é válido"),
    }),
});


const update = validateRequest({
    body: z.object({
        nome: z.string().optional,
        email: z.string().email("O email não é válido").optional,
        senha: z.string().optional,
        endereco: z.string().optional,
        descricao: z.string().optional,
        

    }),
    params: z.object({
        id: z.custom(mongoose.isValidObjectId, "O id não é válido"),
    }),
})
module.exports = {
    create,
    destroy,
    update,

}

