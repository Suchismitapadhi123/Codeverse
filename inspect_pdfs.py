import pypdf
import os

pdf_files = [
    "C++ Cheatsheet.pdf",
    "DSA_CompleteNotes.pdf",
    "JS_Chapterwise_Notes.pdf",
    "The Ultimate Python Handbook.pdf"
]

base_dir = r"C:\Users\SUCHISMITA\.gemini\antigravity\scratch\codeverse"
report_path = os.path.join(base_dir, "pdf_report.txt")

with open(report_path, "w", encoding="utf-8") as f:
    f.write("=== PDF INSPECTION REPORT ===\n\n")
    for pdf in pdf_files:
        path = os.path.join(base_dir, pdf)
        f.write(f"File: {pdf}\n")
        if not os.path.exists(path):
            f.write("STATUS: NOT FOUND\n\n")
            continue
        try:
            reader = pypdf.PdfReader(path)
            num_pages = len(reader.pages)
            f.write(f"Number of Pages: {num_pages}\n")
            
            # Extract first 3 pages
            f.write("--- Content Preview (First 3 Pages) ---\n")
            for i in range(min(3, num_pages)):
                text = reader.pages[i].extract_text()
                f.write(f"--- Page {i+1} ---\n")
                f.write(text[:1500] if text else "[No text extracted]")
                f.write("\n")
            f.write("=======================================\n\n")
        except Exception as e:
            f.write(f"ERROR: {str(e)}\n\n")

print("Report written successfully to", report_path)
