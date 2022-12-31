// See https://aka.ms/new-console-template for more information
using Application;
using Application.Activities;
using System.Diagnostics;
using System.Net;
using System.Text;

Console.WriteLine("Hello, World!");

string sentence = "one two three four five";

string result = sentence.Split(' ').First(x => x.StartsWith('o')).ToString();

string newSentence = String.Join(' ', sentence.Split(' ').Select(word => new String(word.Reverse().ToArray())));

Console.WriteLine(result);
Console.WriteLine(newSentence);


var test = new Add();

Console.WriteLine(test.B(2));

//HttpClient client = new HttpClient();
//string url = "http://localhost:5000/api/activities";

//try
//{
//    HttpResponseMessage response = await client.GetAsync(url);
//    response.EnsureSuccessStatusCode();
//    string responseBody = await response.Content.ReadAsStringAsync();
//    // Above three lines can be replaced with new helper method below
//    // string responseBody = await client.GetStringAsync(uri);

//    Console.WriteLine(responseBody);
//}
//catch (HttpRequestException e)
//{
//    Console.WriteLine("\nException Caught!");
//    Console.WriteLine("Message :{0} ", e.Message);
//}