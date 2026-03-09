function run(operations) {

    let stack = [];
    let states = [];

    operations.forEach(op => {

        if (op.type === "push") {
            stack.push(op.value);
            states.push({
                stack: [...stack],
                action: "push"
            });
        }

        if (op.type === "pop") {
            stack.pop();
            states.push({
                stack: [...stack],
                action: "pop"
            });
        }
    });

    return states;
}

module.exports = { run };
