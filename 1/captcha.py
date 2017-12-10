line = input()

sum = 0
for i in range(len(line)):
  # Manages edge case as well with negative indexing
  if line[i] == line[i-1]:
    sum += int(line[i-1])

print(sum)
