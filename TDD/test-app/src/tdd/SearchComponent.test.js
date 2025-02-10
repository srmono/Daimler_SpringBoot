import { render, screen, fireEvent } from "@testing-library/react";
import SearchComponent from "./SearchComponent";

test('render input field', () => { 
    render(<SearchComponent users={[]} />);

    const input = screen.getByPlaceholderText(/search users/i);

    expect(input).toBeInTheDocument()
    
 })

 test('filters users based on input', () => { 
    render(<SearchComponent users={['Alice', 'Bob', 'Charlie']} />);

    const input = screen.getByPlaceholderText(/search users/i);

    fireEvent.change(input, {target: {value: "Bo"}})

    expect(screen.getByText("Bob")).toBeInTheDocument()
    expect(screen.queryByText("Alice Johnson")).not.toBeInTheDocument()

  })