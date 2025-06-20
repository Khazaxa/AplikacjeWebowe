using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Domain.Migrations
{
    /// <inheritdoc />
    public partial class CascadeDelete : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Stories_Projects_ProjectId",
                table: "Stories");

            migrationBuilder.DropForeignKey(
                name: "FK_Tasks_Stories_StoryId",
                table: "Tasks");

            migrationBuilder.AddForeignKey(
                name: "FK_Stories_Projects_ProjectId",
                table: "Stories",
                column: "ProjectId",
                principalTable: "Projects",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Tasks_Stories_StoryId",
                table: "Tasks",
                column: "StoryId",
                principalTable: "Stories",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Stories_Projects_ProjectId",
                table: "Stories");

            migrationBuilder.DropForeignKey(
                name: "FK_Tasks_Stories_StoryId",
                table: "Tasks");

            migrationBuilder.AddForeignKey(
                name: "FK_Stories_Projects_ProjectId",
                table: "Stories",
                column: "ProjectId",
                principalTable: "Projects",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Tasks_Stories_StoryId",
                table: "Tasks",
                column: "StoryId",
                principalTable: "Stories",
                principalColumn: "Id");
        }
    }
}
