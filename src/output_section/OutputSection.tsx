import Output from "../output/Output";

function OutputSection() {
    const comments = [
        { id: 1, text: "Subtask 1: Create Lambda Function", level: "HIGHT" },
        { id: 2, text: "Subtask 2: API Endpoint Creation", level: "HIGHT"  },
        { id: 3, text: "Subtask 3: Update Front-end", level: "HIGHT"  },
    ];
    return (
        <>
        <h1 className="text-xl font-semibold mb-4">Output Section</h1>
        {comments.map(comment => (
            <Output key={comment.id} text={comment.text} />
      ))}
        </>
    );
}

export default OutputSection