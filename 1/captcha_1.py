def main():
  digits = input()
  match_sum = 0
  for i, c in enumerate(digits):
    # Manages edge case as well with negative indexing
    if digits[i] == digits[i-1]:
      match_sum += int(digits[i-1])

  print("Part 1:", match_sum)

if __name__ == "__main__":
  main()
