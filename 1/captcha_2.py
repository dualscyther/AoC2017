def main():
  digits = input()
  offset = int(len(digits)/2)
  match_sum = 0
  for i, c in enumerate(digits):
    if digits[i] == digits[i-offset]:
      match_sum += int(digits[i-offset])

  print("Part 2:", match_sum)

if __name__ == "__main__":
  main()
