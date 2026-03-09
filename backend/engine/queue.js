function run(operations) {

    let queue = [];
    let states = [];

    operations.forEach(op => {

        if (op.type === "enqueue") {
            queue.push(op.value);
            states.push({
                queue: [...queue],
                action: "enqueue"
            });
        }

        if (op.type === "dequeue") {
            queue.shift();
            states.push({
                queue: [...queue],
                action: "dequeue"
            });
        }
    });

    return states;
}

module.exports = { run };
