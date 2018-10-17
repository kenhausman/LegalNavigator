﻿using System;
using System.Collections.Generic;
using System.IO;

namespace HTMLContentExtractor
{
   public class Program
    {
        public static void Main(string[] args)
        {
            Console.WriteLine("Please provide json file path to process");
            // Pass Json file path name including filename ex: C:\Users\v-turake\Documents\My Received Files\template3.json
            string path = Console.ReadLine();
            string text = LoadJson(path);
            var guids = ExtractFromString(text, "<legal-nav-resource-id>", "</legal-nav-resource-id>");

            foreach (var guid in guids)
            {
                Console.WriteLine(guid);
            }

            Console.ReadKey();
        }

        /// <summary>
        /// Reads json file and returns string.
        /// </summary>
        /// <param name="path"></param>
        /// <returns></returns>
        public static string LoadJson(string path)
        {
            string json = string.Empty;
            using (StreamReader r = new StreamReader(path))
            {
                json = r.ReadToEnd();
            }
            return json;
        }

        /// <summary>
        /// Fetches content from string using start and end elements.
        /// </summary>
        /// <param name="text"></param>
        /// <param name="startString"></param>
        /// <param name="endString"></param>
        /// <returns></returns>
        private static List<Guid> ExtractFromString(string text, string startString, string endString)
        {
            List<Guid> matched = new List<Guid>();
            int indexStart = 0, indexEnd = 0;
            bool exit = false;
            while (!exit)
            {
                indexStart = text.IndexOf(startString);
                indexEnd = text.IndexOf(endString);
                if (indexStart != -1 && indexEnd != -1)
                {
                    matched.Add(new Guid(text.Substring(indexStart + startString.Length,
                        indexEnd - indexStart - startString.Length)));
                    text = text.Substring(indexEnd + endString.Length);
                }
                else
                    exit = true;
            }
            return matched;
        }

    }
}
