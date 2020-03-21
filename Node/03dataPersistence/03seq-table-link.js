// sequelize表关联
(async () => {
    const Sequelize = require("sequelize");
    // 建立连接
    const sequelize = new Sequelize("20200312", "root", "QSXdr1991", {
        host: "localhost",
        dialect: "mysql",
        operatorsAliases: false
    })

    // 1:N关系
    // 1. 创建表
    const Player = sequelize.define('player', { name: Sequelize.STRING })
    const Team = sequelize.define('team', { name: Sequelize.STRING })
    // 2. 建立表关系
    Player.belongsTo(Team); // 1端建立关系
    Team.hasMany(Player); // N端建立关系
    // 3. 同步数据库
    sequelize.sync({ force: true }).then(async () => {
        await Team.create({ name: '火箭' });
        await Player.bulkCreate([{ name: '哈登', teamId: 1 }, { name: '保罗', teamId: 1 }])
        await Team.create({ name: '勇士' })
        await Player.bulkCreate([{ name: '库里', teamId: 2 }, { name: '汤普森', teamId: 2}])

        // 4 1端关联查询  
        const players = await Player.findAll({ include: [Team] });
        console.log(JSON.stringify(players, null, 2));
        // 5 N端关联查询
        const team = await Team.findOne({ where: { name: '勇士' }, include: [Player] });
        console.log(JSON.stringify(team, null, 2));
    })

    // N:N关系
    const Fruit = sequelize.define("fruit", { name: Sequelize.STRING });
    const Category = sequelize.define("category", { name: Sequelize.STRING });
    Fruit.FruitCategory = Fruit.belongsToMany(Category, {
        through: "FruitCategory"
    })
    sequelize.sync({ force: true }).then(async () => {
        await Fruit.create(
            {
                name: "香蕉",
                categories: [{ id: 1, name: "热带" }, { id: 2, name: "温带" }]
            },
            {
                include: [Fruit.FruitCategory]
            }
        );
        // 多对多联合查询
        const fruit = await Fruit.findOne({
            where: { name: "香蕉" }, // 通过through指定条件、字段等
            include: [{ model: Category, through: { attributes: ['id', 'name'] } }]
        });
    })
})()

