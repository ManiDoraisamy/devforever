# Let AI Speak in Its Mother Tongue

Two years ago, Mark Zuckerberg revealed that teaching Meta's Llama model with code significantly improved its reasoning ability. It enabled smaller models like Llama 3 to outperform larger models like Llama 2. The industry took notice and every leading AI lab began teaching models to code. This essay explores why learning code helps models reason.

In the second part, we'll explore how models went from learning code to generating code as a reasoning tool. While doing so, they continue using transformer architectures built for natural language leading to accuracy loss.

In the third part, I propose graph transformers for code generation. Current transformers excel at word sequences but struggle with code's hierarchical structure (packages containing classes containing functions containing expressions and datastructures). Graphs naturally represent this hierarchy.

---

## Why Teaching Code Improves Reasoning in AI

Consider a simple problem of placing a 13-foot ladder to reach exactly 12 feet up a wall:

**Users work with data:** A maintenance worker will climb the ladder with measuring tape, mark 12 feet on the wall, then drags the ladder until it hits the mark. This approach works directly with physical data i.e. measuring, positioning, adjusting. It's concrete, reliable, but inefficient.

**Engineers work with metadata:** An engineer will apply the Pythagorean theorem: √(13² - 12²) = 5 feet. They will place the ladder base 5 feet from the wall, and it will reach exactly 12 feet. The engineer works with abstract relationships such as variables, equations, formulas that generalize across all similar problems. One calculation replaces countless physical measurements.

This is why users use spreadsheets for repetitive tasks. Spreadsheets provide an intuitive way to work with data while writing formulas that can be applied to consecutive rows. You see the results immediately as you work.

Developers, on the other hand, think with algebra (i.e., as metadata). They declare variables (ladder_length, wall_height), apply operations, and assign the result to distance_from_wall. They express this logic in an IDE without seeing any data. Only at runtime do they apply actual values and check if their logic works correctly.

This ability to abstract logic from data is what separates developers from users. It's also what distinguishes models trained primarily on text (like early GPT-3) from those trained heavily on code (like GPT-5). Code represents metadata, not data. When you write `distance = math.sqrt(ladder**2 - height**2)`, you're manipulating variables (metadata) that represent values (data).

This explains why Llama 3, trained on code, outperformed the larger Llama 2 in reasoning. It learned to operate at the metadata level by thinking in terms of variables and functions rather than concrete values. Training on code isn't about learning syntax; it's about learning to abstract. When trained on Python code, the model's hidden states learn to represent code structure as variables, types, control flow rather than just word patterns.

Reasoning is the ability to climb this abstraction ladder: from manipulating concrete data to manipulating the code that generates the data. This abstraction jump created a wave of AI coding tools. But then progress stalled. Instead of improving code understanding, models started outsourcing to external Python interpreters.
