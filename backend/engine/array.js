function run(arr) {

    let states = [];
    let a = [...arr];

    states.push({ array: [...a], action: "initial" });

    for (let i = 0; i < a.length; i++) {
        states.push({
            array: [...a],
            highlight: [i],
            action: "traverse"
        });
    }

    return states;
}

module.exports = { run };
