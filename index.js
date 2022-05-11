const { ApolloServer, gql } = require('apollo-server')

const usuarios = [{
    id:1,
    nome:'João Silva',
    email:'jsilva@zemail.com',
    idade:29
},
{
    id:2,
    nome:'Rafael Menezes',
    email:'rafamenel@umail.com',
    idade: 23
},
{
    id:3,
    nome:'Daniela Smith',
    email:'danismith@protonmail.com',
    idade:31
}
]

const perfis = [
    {
        cod: 1,
        nome: 'usuario comum'
    },
    {
        cod: 2,
        nome: 'administrador'
    }
]

const typeDefs = gql`
    scalar Date

    type Produto {
        nome: String!
        preco: Float!
        desconto: Float
        precoComDesconto: Float
    }
    
    type Usuario {
        id: ID
        nome: String!
        email: String!
        idade: Int
        salario: Float
        vip: Boolean
        nascimento: Date
    }

    type Perfil {
        cod: Int
        nome: String!
    }

    type Query {
        horaAtual: Date
        usuarioLogado: Usuario
        produtoEmDestaque: Produto
        gerarMegaSena: [Int]!
        usuarios: [Usuario]!
        usuario(id: ID): Usuario
        perfis: [Perfil]!
        perfil(cod: Int): Perfil
    }
`

const resolvers = {
    Produto: {
        precoComDesconto(produto) {
            return produto.preco * (1 - produto.desconto)
        }
    },

    Query: {
        horaAtual() {
            const now = new Date
            return now.toLocaleString('pt-BR', {timezone: 'UTC-3'})
        },
        usuarioLogado() {
            return {
                id: 01, 
                nome: 'Marcos Moura', 
                email: 'marcosvnogsl@gmail.com',
                idade: 26,
                salario: 3000.50,
                vip: true,
                nascimento: '27/04/1996'
            }
        }, produtoEmDestaque() {
            return {
                nome: 'Notebook Lenovo Thinkpad T-430',
                preco: 3432.90,
                desconto: 0.15,
            }
        }, gerarMegaSena() {
            const ordenar = (a, b) => a - b
            return Array(6).fill(0)
            .map(() => parseInt(Math.random() * 60 + 1))
            .sort(ordenar)
        }, 
        usuarios() {
            return usuarios
        },
        usuario(_, args) {
            const users = usuarios
                .filter(user => user.id == args.id)
            return users? users[0] : null
        },
        perfis() {
            return perfis
        },
        perfil(_,perfil) {
            const perf = perfis
                .filter(p => p.cod == perfil.cod)
            return perf? perf[0] : null
        }
    }
}

const server = new ApolloServer({
    typeDefs,
    resolvers
})

server.listen().then(({ url }) => {
    console.log(`Executando em ${url}`)
})