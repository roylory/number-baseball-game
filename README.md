## What Is Number Baseball Game?

It's a nostalgic 3-digit number guess game built in React. (I grew up in Korea. At least, it's nostalgic to me.)

### Strikes

If the same digit appears in the same location, it's called *Strike*.

```
712 is 1 strike against 789.
423 is 2 strikes against 123.
```

3 strikes would mean you guessed the number correctly.

### Balls

If the same digit appears in the different location, it's called *Ball*.

```
134 is 1 ball against 815.
123 is 2 balls against 342.
234 is 3 balls against 342.
```

### Balls and Strikes Togther

```
123 is 1 ball and 1 strike against 243.
345 is 2 balls and 1 strike against 543.
```

### Other Rules

- 0 cannot be used. (ex: 304 is not valid.)

- Same digit cannot appear more than once. (ex: 433 is not valid.)

- Logically, there can be no 1 ball and 2 strikes.

- You can keep guessing until you correctly find the number.