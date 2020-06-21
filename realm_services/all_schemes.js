export const RealmSchema = [
    {
        name: 'Usuario',
        primaryKey: 'mid',
        properties: {
            mid: { type: 'int', indexed: true },
            nome: { type: 'string', default: '' },
            numeroQuestoes: { type: 'int', default: 0},
            createdAt: { type: 'date', default: Date() },
            removido: { type: 'bool', default: false }
        }
    },
    {
        name: 'Partida',
        primaryKey: 'mid',
        properties: {
            mid: { type: 'int', indexed: true },
            jogador: { type: 'int', default: 0 },
            imageJogador: { type: 'int', default: 0 },
            totalQuestoes: { type: 'int', default: 0},
            questoesCorretas: { type: 'int', default: 0},
            createdAt: { type: 'date', default: Date() },
            removido: { type: 'bool', default: false }
        }
    }
]